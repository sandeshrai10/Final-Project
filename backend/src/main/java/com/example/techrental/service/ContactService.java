package com.example.techrental.service;

import com.example.techrental.model.Contact;
import java.util.List;

public interface ContactService {
    Contact saveContact(Contact contact);
    List<Contact> getAllContacts();
    Contact getContactById(Long id);
    void deleteContactById(Long id);
}
