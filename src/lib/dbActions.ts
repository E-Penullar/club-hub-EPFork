'use server';

import { Contact } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Adds a new contact to the database.
 * @param contact, an object with the following properties: id, firstName, lastName, address, image, description, owner.
 */
export async function addContact(contact: {   
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  })
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing Ccontact in the database.
 * @param contact, an object with the following properties: id, firstName, lastName, address, image, description, owner.
 */
export async function editContact(contact: Contact) {
  await prisma.contact.update({
    where: {id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  })
  // After adding, redirect to the list page
  redirect('/list');
}

export async function addNote(note: { note: string; contactId: number, owner: string }) {
    await prisma.note.create({
        data: {
            note: note.note,
            contactId: note.contactId,
            owner: note.owner,
        },
    });
    // After adding, redirect to the list page
    redirect('/list');
}
