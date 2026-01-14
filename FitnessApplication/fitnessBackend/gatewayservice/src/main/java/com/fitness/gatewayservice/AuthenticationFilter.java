package com.fitness.gatewayservice;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;




@Component
public class AuthenticationFilter implements GlobalFilter {

    //Logger log;
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return exchange.getSession().flatMap(session -> {
            String userId = session.getAttribute("userId");


            if(userId != null){
                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                        .header("X-User-Id",userId)
                        .build();
                return chain.filter(exchange.mutate().request(modifiedRequest).build());


            }
            return chain.filter(exchange);

        });
    }
}
