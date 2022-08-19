import axios from "axios";

import {api} from '../backend/Api';

export const getStickerNotesByUserEmail  = async (email: string) => {
  try {

    const { data } = await api.get(`/stickernotes/${email}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createStickerNotes = async (description: string, data: string, priority: string, email: string) => {
    try {
        const response  = api.post('/stickernotes', {
            description,
            data,
            priority,
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
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}

export const updateStickerNotes = async (id: string, description: string, data: string, priority: string, email: string) => {
    try {
        const response  = api.post(`/stickernotes/${id}`, {
            description,
            data,
            priority,
            email,
        });
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}