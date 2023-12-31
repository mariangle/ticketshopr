"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { XCircleIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import qs from "query-string";
import * as z from "zod";
import * as react from "react";
import { useStore } from "@/hooks/use-store";
import { useApiStore } from "@/hooks/use-api-store";

const formSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Feltet kan ikke være tomt." })
});

type SearchFormValues = z.infer<typeof formSchema>;

export const TicketSearchForm = () => {
  const { toast } = useToast();
  const apiStore = useStore(useApiStore, (state) => state);
  const [isLoading, setisLoading] = react.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    setisLoading(true);
    if (!apiStore?.isTestUser){
      const queryParams = { query: data.query };
      const queryString = qs.stringify(queryParams);
      router.push(`/tickets?${queryString}`);

    } else {
      toast({
        title: "Oops.",
        description: "This feature doesn't work with test data.",
        variant: "destructive",
      });
    }
    setisLoading(false);
  };

  const onReset = () => {
    router.push(`/tickets`);
    form.reset();
  }

  return (
      <Form {...form}>
        <form>
          <div className="flex gap-2 items-end">
            <div className="flex items-center border rounded-md">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Søg ticket..." className="border-none focus-visible:ring-none focus:ring-offset-0 focus:ring-transparent" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="flex gap-2 items-center p-0 border-none hover:bg-none"
                variant={"outline"}
                onClick={onReset}
                disabled={isLoading}
              >
                <XCircleIcon className="w-3 h-3"/>
              </Button>
              <Button
                type="submit"
                className="flex gap-2 items-center p-2 border-none"
                variant={"outline"}
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                <SearchIcon className="w-4 h-4"/>
              </Button>
            </div>
          </div>
        </form>
      </Form> 
  );
};