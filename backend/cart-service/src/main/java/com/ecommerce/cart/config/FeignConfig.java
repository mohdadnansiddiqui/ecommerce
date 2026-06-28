package com.ecommerce.cart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class FeignConfig {
    @Bean
	RequestInterceptor requestInterceptor() {
		return requestInterceptor -> {

			ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder
					.getRequestAttributes();
			if(servletRequestAttributes==null)
				return;
			HttpServletRequest request = servletRequestAttributes.getRequest();
			String authorization = request.getHeader("Authorization");
			if(authorization!=null)
				requestInterceptor.header("Authorization", authorization);
		};
	}

}
