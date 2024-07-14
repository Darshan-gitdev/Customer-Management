 package com.darshan.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.darshan.demo.dao.CustomerRepository;
import com.darshan.demo.entities.Customers;

@SpringBootApplication
public class Demoproject1Application {
	
	@Autowired
	private CustomerRepository cr;
	
	public static void main(String[] args) {
		SpringApplication.run(Demoproject1Application.class, args);
		System.out.println("hello ");
		
	}
	public void run(String... args)throws Exception{
		Customers cur= new Customers();
		
		cur.setFirstName("Rahul ");
		cur.setLastName("Joshi");
		cur.setCity("Pune");
		cur.setAddress("Naarhe ");
		cur.setMobileNo("544555");
		cur.setEmail("rahul@mail.com");
		cur.setState("Maharashtra");
		
		cr.save(cur);
		System.out.println(cur);

	}

}
