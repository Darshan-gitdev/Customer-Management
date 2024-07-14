package com.darshan.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customers {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String firstName;
	private String lastName;
	private String city;
	private String address;
	private String state;
	private String email;
	private String mobileNo;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	@Override
	public String toString() {
		return "Cutomers [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", city=" + city
				+ ", address=" + address + ", state=" + state + ", email=" + email + ", mobileNo=" + mobileNo + "]";
	}
	public Customers(int id, String firstName, String lastName, String city, String address, String state, String email,
			String mobileNo) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.city = city;
		this.address = address;
		this.state = state;
		this.email = email;
		this.mobileNo = mobileNo;
	}
	public Customers() {
		super();
		// TODO Auto-generated constructor stub
	}



}
