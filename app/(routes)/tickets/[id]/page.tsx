"use client"

import { Separator } from "@/components/ui/separator";
import { GetTicket } from "@/actions/get-ticket";
import { TicketInfo } from "./components/ticket-info";
import { CustomerInfo } from "./components/customer-info";
import * as react from "react";
import { Ticket } from "@/types/ticket";
import { useApiStore } from "@/hooks/use-api-store";
import { useStore } from "@/hooks/use-store";
import { getTestData } from "@/actions/get-test-data";
import { useRouter } from "next/navigation";
import { Comment } from "@/components/comment";

const Page = ({ 
    params
  }: {
    params: { id: string }
  }) => {
    const [ data, setData ] = react.useState<Ticket | null>(null);
    const apiStore = useStore(useApiStore, (state) => state);
    const router = useRouter();

    react.useEffect(() => {
      const fetchData = async () => {
        if (!apiStore) return;
  
        try {
          if (apiStore.isTestUser) {
            const testData = await getTestData();
            const ticket = testData.find((item) => item.id === params.id);
            setData(ticket || null);
          } else if (apiStore.isLogged) {
            const ticketData = await GetTicket(params.id, {
              subdomain: apiStore.credentials.subdomain,
              apiKey: apiStore.credentials.apiKey,
            });
            setData(ticketData);
          } else {
            router.push("/")
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [apiStore?.isLogged, apiStore?.isTestUser, params.id]);

    if (!data) return null;

    return (
      <div className="p-4">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">#{data.number}</h2>
          <p className="text-muted-foreground">
            {data.subject}
          </p>
        </div>
        <Separator className="my-6" />
        <div className="md:grid grid-cols-3  space-x-4">
          <div className="col-span-1 space-y-4">
            <TicketInfo ticket={data}/>
            <CustomerInfo customer={data.customer}/>
          </div>
          <div className="col-span-2">
            <div className="grid gap-4">
              {data.comments?.map((comment) => <Comment comment={comment} key={comment.id}/>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

export default Page;