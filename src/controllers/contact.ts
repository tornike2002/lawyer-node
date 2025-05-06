import { Request, Response } from 'express'
import Contact from '../models/Contact'

export const createContact = async (req: Request, res: Response) => {
  const contactData = await Contact.create(req.body)
  res.status(201).json({
    message: 'Contact created successfully',
    contact: contactData,
  })
}
export const getContacts = async (_req: Request, res: Response) => {
  const contacts = await Contact.find()
  res.status(200).json({
    message: 'Contacts fetched successfully',
    contacts,
  })
}

export const updateContact = async (req: Request, res: Response) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    })
    return
  }
  res.status(200).json({
    message: 'Contact updated successfully',
    contact,
  })
}

export const deleteContact = async (req: Request, res: Response) => {
  const contact = await Contact.findByIdAndDelete(req.params.id)
  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    })
    return
  }
  res.status(200).json({
    message: 'Contact deleted successfully',
    contact,
  })
}
