package com.webhotel.webhotel.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.webhotel.webhotel.entity.Room;

public interface RoomRepository extends CrudRepository<Room, Integer> {

    List<Room> findByIsAvailable(boolean available);

}
