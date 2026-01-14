package com.fitness.activityservice.service;

import com.fitness.activityservice.ActivityRepository;
import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.model.Activity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;
    private final KafkaTemplate<String, Activity> kafkaTemplate;

    @Value("${kafka.topic.name}")
    private String topicName;


    private String getCurrentUserId(){
        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs != null) {
            String headerId = attrs.getRequest().getHeader("X-User-Id");
            System.out.println("DEBUG: Header X-User-Id received: " + headerId);
            return headerId;
        }

        return null;
    }

    public ActivityResponse trackActivity(ActivityRequest request) {

        String userId = getCurrentUserId();
        if(userId == null || userId.isEmpty()){
            userId = request.getUserId();
        }

        if (userId == null || userId.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User ID is missing"
            );
        }

        boolean isValidUser = userValidationService.validateUser(userId);

//

        if (!isValidUser) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid user"
            );
        }
            Activity activity = Activity.builder()
                    .userId(userId)
                    .type(request.getType())
                    .duration(request.getDuration())
                    .caloriesBurned(request.getCaloriesBurned())
                    .startTime(request.getStartTime())
                    .additionalMetrics(request.getAdditionalMetrics())
                    .build();

            Activity savedActivity = activityRepository.save(activity);

            try{
                kafkaTemplate.send(topicName, savedActivity.getUserId(),savedActivity);
            } catch (Exception e) {
                e.printStackTrace();
            }


        return mapToResponse(savedActivity);
    }

    public List<ActivityResponse> getActivitiesByUser(String userId){
        return activityRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ActivityResponse mapToResponse(Activity savedActivity) {

        ActivityResponse response = new ActivityResponse();
        response.setId(savedActivity.getId());
        response.setUserId(savedActivity.getUserId());
        response.setType(savedActivity.getType());
        response.setDuration(savedActivity.getDuration());
        response.setCaloriesBurned(savedActivity.getCaloriesBurned());
        response.setStartTime(savedActivity.getStartTime());
        response.setAdditionalMetrics(savedActivity.getAdditionalMetrics());
        response.setCreatedAt(savedActivity.getCreatedAt());
        response.setUpdatedAt(savedActivity.getUpdatedAt());
        return response;

    }
}
