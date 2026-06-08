package com.ecommerce.customer.application.mapper;

import com.ecommerce.customer.application.dto.CustomerRequest;
import com.ecommerce.customer.application.dto.CustomerResponse;
import com.ecommerce.customer.domain.model.Customer;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-07T22:37:38+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer toEntity(CustomerRequest request) {
        if ( request == null ) {
            return null;
        }

        Customer.CustomerBuilder customer = Customer.builder();

        customer.firstName( request.firstName() );
        customer.lastName( request.lastName() );
        customer.email( request.email() );
        customer.phoneNumber( request.phoneNumber() );
        customer.address( request.address() );

        return customer.build();
    }

    @Override
    public CustomerResponse toResponse(Customer customer) {
        if ( customer == null ) {
            return null;
        }

        Long id = null;
        String firstName = null;
        String lastName = null;
        String email = null;
        String phoneNumber = null;
        String address = null;
        Instant createdAt = null;

        id = customer.getId();
        firstName = customer.getFirstName();
        lastName = customer.getLastName();
        email = customer.getEmail();
        phoneNumber = customer.getPhoneNumber();
        address = customer.getAddress();
        createdAt = customer.getCreatedAt();

        CustomerResponse customerResponse = new CustomerResponse( id, firstName, lastName, email, phoneNumber, address, createdAt );

        return customerResponse;
    }

    @Override
    public void updateEntity(CustomerRequest request, Customer customer) {
        if ( request == null ) {
            return;
        }

        if ( request.firstName() != null ) {
            customer.setFirstName( request.firstName() );
        }
        if ( request.lastName() != null ) {
            customer.setLastName( request.lastName() );
        }
        if ( request.email() != null ) {
            customer.setEmail( request.email() );
        }
        if ( request.phoneNumber() != null ) {
            customer.setPhoneNumber( request.phoneNumber() );
        }
        if ( request.address() != null ) {
            customer.setAddress( request.address() );
        }
    }
}
