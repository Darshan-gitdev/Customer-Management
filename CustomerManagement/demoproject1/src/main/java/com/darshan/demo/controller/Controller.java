package com.darshan.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.darshan.demo.entities.Customers;
import com.darshan.demo.services.Service;

@RestController

public class Controller {
	@Autowired
	private Service service;
	@CrossOrigin
	@PostMapping("/customer")
	public Customers addCustomers(@RequestBody Customers customer) {
		
		Customers cust = service.addCustomer(customer);
		return cust;
		
	}
	@CrossOrigin
	@GetMapping("/customer")
	public List<Customers> getCustomers() {
		
		List<Customers> cust = (List<Customers>) service.getCustomer();
		return cust;
		
	}
	@CrossOrigin
	@GetMapping("/customer/{id}")
	public Customers getById(@PathVariable("id") int id) {
		
		Customers cust = service.getById(id);
		
		return cust;
		
	}
	@CrossOrigin
	@PutMapping("/customer/{id}")
	public Customers updateById (@PathVariable ("id") int id,@RequestBody Customers customer) {
		Customers cust= service.updateCustomers(id,customer);
		return cust;
	}
	
	@CrossOrigin
	@DeleteMapping("/customer/{id}")
	public void deleteCustomer(@PathVariable("id") int id) {
		service.deleteCustomer(id);
		
	}
	
	
	

}
