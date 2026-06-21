package com.ecommerce.auth.event;

import java.util.concurrent.CompletableFuture;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerCreateEvent {
	private final KafkaTemplate<String, String> kafkaTemplate;

	public void customerCreate(String msg) {
		int i = 0;
		while (i>10) {
			CompletableFuture<SendResult<String, String>> send = kafkaTemplate.send("customer-create-topic",
					"customer  " + i++);
			send.whenComplete((success, error) -> {
				if (error == null) {
					log.info("customer create event sent succesfully :{}", success.getProducerRecord().value());

				}
			});

		}

	}

}
