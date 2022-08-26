import axios from "axios";

import {api} from '../backend/Api';

export const getStickerNotesByUserEmail  = async (email: string) => {
  try {
    const response = await api.get(`/stickernotes-user/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createStickerNotes = async (description: string, email: string) => {
    try {
        const response  = api.post('/stickernotes', {
            description,
            email,
        });
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}

export const removeStickerNotes = async (id: string) => {
    try {
        const response = await api.delete(`/stickernotes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export const updateStickerNotes = async (id: string, description: string, priority: number) => {
    try {
        const response  = api.put(`/stickernotes/${id}`, {
            description,
            priority,
        });
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}