package com.darshan.demo.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.darshan.demo.entities.Customers;


@Repository
public interface CustomerRepository  extends CrudRepository<Customers, Integer>{
	public Customers findById(int ID);
	

}
