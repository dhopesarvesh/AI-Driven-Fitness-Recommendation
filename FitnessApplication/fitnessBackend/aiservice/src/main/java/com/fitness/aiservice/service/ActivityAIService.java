package com.fitness.aiservice.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAIService {
    public final  GeminiService geminiService;

    public Recommendation generateRecommendation(Activity activity){
        String prompt = createPromptForActivity(activity);
        String aiResponse = geminiService.getRecommendations(prompt);
        log.info("RESPONSE FROM AI {} ", aiResponse);
        return processAIResponse(activity, aiResponse);

    }

    private Recommendation processAIResponse(Activity activity, String aiResponse) {

        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(aiResponse);
            JsonNode textNode = rootNode.at("/candidates/0/content/parts/0/text");

            if(!textNode.isMissingNode()){
                String jsonContent = textNode.asText()
                        .replace("```json", "")
                        .replace("```", "")
                        .replace("**","")
                        .replace(". ",".\n\n")
                        .replace("\\n","\n")
                        .trim();

                //JsonNode data = mapper.readTree(jsonContent);

                return Recommendation.builder()
                                .userId(activity.getUserId())
                                        .activityId(activity.getId())
                                                .recommendation(jsonContent)




                                                        .createdAt(LocalDateTime.now())
                                                                .build();

                //log.info("RESPONSE FROM CLEANED AI {} ", jsonContent);
            }else{
                log.warn("The Expected path /candidates/0/content/parts/0/text was not found ");
            }




        }catch (JsonProcessingException e){
             log.error("Failed to parse AI Response {}", e.getMessage());
        }

        return null;
    }



    private String createPromptForActivity(Activity activity) {
        return String.format("""
                You are an AI fitness activity analyzer.
                
                You will receive input strictly in JSON format representing a user's fitness activity.
                Your task is to:
                
                1. Parse the JSON exactly as provided.
                2. Do NOT invent, assume, or modify any data.
                3. Use only the fields present in the JSON.
                4. Generate a detailed, structured, and readable activity summary.
                5. Convert raw values into meaningful insights.
                6. Keep the output factual, clear, and easy to understand.
                7. Length: Aim for 200-300 words total. DO NOT use double astericks (**) for BOLD the words .
                ### Output Format Rules:
                - Start with a clear activity title.
                - Present key metrics in bullet points.
                - Provide a short performance analysis.
                
                - Do NOT add recommendations unless explicitly derivable from the data.
                - Do NOT include any data not present in the JSON.
                
                ### Input:
                Type: %s
                Duration: %d
                CaloriesBurned: %d
                AdditionalMetrics: %s
                
                ### Output:
                Generate a detailed activity report using only the provided JSON data.
                
                """,
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics()

        );
    }
}
