package com.fitness.aiservice.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor

public class ActivityMessageListner {


    @Autowired
    ObjectMapper objectmapper;

    private final ActivityAIService activityAIService;
    private final RecommendationRepository recommendationRepository;


    @KafkaListener(topics = "${kafka.topic.name}", groupId = "activity-processor-group")
    public void processActivity(String message)throws Exception{
      Activity activity = objectmapper.readValue(message, Activity.class);
      log.info("Recieved Activity feilds {}", activity.getUserId());

        Recommendation recommendation = activityAIService.generateRecommendation(activity);
        if(recommendation != null){
            recommendationRepository.save(recommendation);
            log.info("Saved AI Recommendations to DB: {}", activity);
        }else{
            log.warn("Recommendation was null, skipped to save to DB");
        }


      activityAIService.generateRecommendation(activity);



    }
}
