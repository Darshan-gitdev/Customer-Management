package com.darshan.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.darshan.demo.dao.CustomerRepository;
import com.darshan.demo.entities.Customers;

@Component
public class Service {

	
	@Autowired
	private CustomerRepository repo;
	
	public Customers addCustomer (Customers customer) {
		
		Customers cs= repo.save(customer);
		return cs;
	}
	
	
	public List<Customers> getCustomer() {
		List<Customers> cls= (List<Customers>) repo.findAll();
		
		return  cls;
	}


	public Customers getById(int id) {
		// TODO Auto-generated method stub
		Customers ctr= repo.findById(id);
		return ctr;
	}


	public Customers updateCustomers(int id, Customers customer) {
		// TODO Auto-generated method stub
		customer.setId(id);
		Customers csr= repo.save(customer);
		return null;
	}


	public void deleteCustomer(int id) {
		repo.deleteById(id);
		// TODO Auto-generated method stub
	}
}