package com.ecommerce.auth.shared.exception;

public class ResourceNotFoundException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1838063372793741803L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
}
