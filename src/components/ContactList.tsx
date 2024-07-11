import React from "react";
import { IContact } from "../interfaces/Contact";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  contactList: IContact[];
  editContact: (id: number) => void;
  deleteContact: (id: number) => void;
}

const ContactList = ({ contactList, editContact, deleteContact }: IProps): any => {
  return (
    <List sx={{ maxWidth: '500px', margin: '0 auto' }}>
      {
        contactList.map((item: IContact) => {
          return (
            <ListItem key={item.id}>
              <ListItemText primary={`Name: ${item.name} | Phone: ${item.phone}`} secondary={item.email} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => editContact(item.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteContact(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem >
          );
        })
      }
    </List>
  )
}

export default ContactList;