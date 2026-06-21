package com.ecommerce.auth.shared.exception;

public class BadRequestException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -67193193864378239L;

	public BadRequestException(String message) {
        super(message);
    }
}
