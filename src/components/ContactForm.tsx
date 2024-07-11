import React, { useState } from "react";
import { IContact } from "../interfaces/Contact";
import { Box, TextField, Button, Grid } from "@mui/material";

interface IProps {
  contact: Partial<IContact> | null;
  setContact: (contact: Partial<IContact> | null) => void;
  contactList: IContact[];
  addContact: (newContact: IContact) => void;
}

const ContactForm = ({ contact, setContact, contactList, addContact }: IProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!contact?.name) {
      newErrors.name = 'O nome é obrigatório.';
    }

    if (contact?.name && contact?.name.length < 3) {
      newErrors.name = 'O nome deve conar ao menos 3 letras.';
    }

    if (!contact?.phone) {
      newErrors.phone = 'O telefone é obrigatórrio.';
    }

    if (contact?.phone && contact?.phone.length !== 11) {
      newErrors.phone = 'O telefone deve ter 11 números.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createContact = (): IContact | undefined => {
    let maxId = 0;

    if (contact && contact.id) {
      maxId = contact.id
    } else {
      maxId = contactList.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
    }

    if (contact && contact.name && contact.phone) {
      const newContact: IContact = {
        id: maxId,
        name: contact.name,
        phone: contact.phone,
        email: contact.email || null
      };

      return newContact;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const newContact = createContact();

      if (newContact) {
        addContact(newContact);
        setContact(null);
      }
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id='filled-name'
            label='Name'
            value={contact?.name || ''}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='filled-phone'
            label='Phone'
            value={contact?.phone || ''}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='filled-email'
            label='E-mail'
            value={contact?.email || ''}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {contact?.id ? 'Atualizar' : 'Adicionar'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactForm;