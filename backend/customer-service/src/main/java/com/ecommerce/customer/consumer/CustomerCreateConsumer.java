package com.ecommerce.customer.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class CustomerCreateConsumer {
   // @KafkaListener(topics = "customer-create-topic")
	public void createConsumer(String msg) {
    	log.info("msg--> {}",msg);
		
	}
	
}
