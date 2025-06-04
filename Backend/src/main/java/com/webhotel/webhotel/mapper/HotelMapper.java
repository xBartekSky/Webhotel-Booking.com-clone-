package com.webhotel.webhotel.mapper;

import com.webhotel.webhotel.dto.CreateHotelDto;
import com.webhotel.webhotel.dto.HotelDto;
import com.webhotel.webhotel.entity.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HotelMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    HotelDto hotelToHotelDto(Hotel hotel);

    @Mapping(source = "ownerId", target = "owner.id")
    Hotel HotelDtoToHotel(HotelDto HotelDto);

    @Mapping(target = "owner", ignore = true)
    Hotel createHotelDtoToHotel(CreateHotelDto createHotelDto);
}
