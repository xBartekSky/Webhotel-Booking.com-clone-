package com.webhotel.webhotel.dto;

import java.time.LocalDate;

public class BookingDto {
    private Long id;
    private Long roomId;
    private Long userId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    // private Double price;
    private String paymentIntentId;
    private boolean paymentRequired;

    public void setPaymentRequired(boolean paymentRequired) {
        this.paymentRequired = paymentRequired;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // public Double getPrice() {
    // return price;
    // }

    // public void setPrice(Double price) {
    // this.price = price;
    // }

    // public String getPaymentIntentId() {
    // return paymentIntentId;
    // }

    // public void setPaymentIntentId(String paymentIntentId) {
    // this.paymentIntentId = paymentIntentId;
    // }

    public boolean isPaymentRequired() {
        return paymentRequired;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }
}
