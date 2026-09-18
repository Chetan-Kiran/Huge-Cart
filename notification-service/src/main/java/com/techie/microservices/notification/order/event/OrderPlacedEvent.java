package com.techie.microservices.notification.order.event;
 
public class OrderPlacedEvent {

    private String orderNumber;
    private String email;
    private String firstName;
    private String lastName;

    public OrderPlacedEvent() {
    }

    public OrderPlacedEvent(String orderNumber,
                            String email,
                            String firstName,
                            String lastName) {
        this.orderNumber = orderNumber;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
