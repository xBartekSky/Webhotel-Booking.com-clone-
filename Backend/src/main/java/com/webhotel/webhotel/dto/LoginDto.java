package com.webhotel.webhotel.dto;

public class LoginDto {
   
    private String password;
    private String email;

    public String getEmail(){
        return email;
    }
    public void setEmial(String email){
        this.email = email;
    }

    

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
