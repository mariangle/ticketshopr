import { Ticket } from "@/types/ticket";

export const GetTicket = async (id: string): Promise<Ticket | null> => {
  const url = `${process.env.BASE_URL}/tickets/${id}`; 

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.API_SECRET as string,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.ticket
  } catch (error) {
    return null;
  }
};