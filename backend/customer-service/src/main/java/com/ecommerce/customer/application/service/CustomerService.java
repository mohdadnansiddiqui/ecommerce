package com.ecommerce.customer.application.service;

import com.ecommerce.customer.application.dto.CustomerRequest;
import com.ecommerce.customer.application.dto.CustomerResponse;
import com.ecommerce.customer.application.mapper.CustomerMapper;
import com.ecommerce.customer.domain.model.Customer;
import com.ecommerce.customer.domain.repository.CustomerRepository;
import com.ecommerce.customer.shared.exception.BadRequestException;
import com.ecommerce.customer.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerResponse create(CustomerRequest request) {
        if (customerRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Customer email already exists");
        }
        Customer customer = customerMapper.toEntity(request);
        Customer saved = customerRepository.save(customer);
        log.info("Created customer {}", saved.getId());
        return customerMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public CustomerResponse getById(Long id) {
        return customerMapper.toResponse(findCustomer(id));
    }

    @Transactional(readOnly = true)
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toResponse)
                .toList();
    }

    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer customer = findCustomer(id);
        customerMapper.updateEntity(request, customer);
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    public void delete(Long id) {
        Customer customer = findCustomer(id);
        customerRepository.delete(customer);
        log.info("Deleted customer {}", id);
    }

    private Customer findCustomer(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + id));
    }
}
