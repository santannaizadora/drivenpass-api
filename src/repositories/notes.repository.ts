import { client } from "../config/database.js";
import { CreateNoteData } from "../services/notes.service";

const getNoteByTitleAndUser = async (title: string, user_id: number) => {
	return await client.note.findFirst({
		where: {
			user: {
				id: user_id,
			},
			title,
		},
	});
};

const getNoteByIdAndUser = async (id: number, user_id: number) => {
  return await client.note.findFirst({
    where: {
      id,
      user: {
        id: user_id,
      },
    },
  });
}

const getNotesByUser = async (user_id: number) => {
  return await client.note.findMany({
    where: {
      user: {
        id: user_id,
      },
    },
  });
}

const insert = async (note: CreateNoteData) => {
	await client.note.create({
		data: {
			title: note.title,
			content: note.content,
			user: {
				connect: {
					id: note.user_id,
				},
			},
		},
	});
};

const deleteNote = async (id: number) => {
  await client.note.delete({
    where: {
      id,
    },
  });
}

export const notesRepository = { 
  getNoteByTitleAndUser,
  getNoteByIdAndUser,
  getNotesByUser, 
  insert,
  deleteNote,
};
