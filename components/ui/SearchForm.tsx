'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { BedDoubleIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";



export const formSchema = z.object({
    location: z.string().min(2, "Must be 2 caracters or more").max(50),
    dates: z.object({
        from: z.date(),
        to: z.date(),
    }),
    adults: z
        .string()
        .min(1, {
            message: "Please select at least 1 adult",
        })
        .max(12, { message: "Max 12 adults Occupancy" }),
    children: z.string().min(0).max(12, {
        message: "Max 12 children Occupancy",
    }),
    rooms: z.string().min(1, {
        message: "Please select at least 1 room",
    }),
});

function SearchForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            dates: {
                from: new Date(),
                to: new Date(),
            },
            adults: "1",
            children: "0",
            rooms: "1",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Form data:", data);
        // Aquí puedes agregar la lógica de búsqueda
        const params = new URLSearchParams({
            location: data.location,
            from: data.dates.from.toISOString(),
            to: data.dates.to.toISOString(),
            adults: data.adults,
            children: data.children,
            rooms: data.rooms,
        });
        
        // Navegar a la página de resultados con los parámetros
        router.push(`/search?${params.toString()}`);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row lg:max-w-6xl mx-auto items-center justify-center space-x-0 lg:space-x-2
                space-y-4 lg:space-y-0 rounded-lg"
            >
                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white flex">
                                    Location
                                    <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="London, Uk" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="dates"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">
                                    Dates
                                    <CalendarIcon className="ml-2 h-4 w-4 text-white inline" />
                                </FormLabel>
                                <FormMessage />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value?.from && field.value?.to ? (
                                                    <>
                                                        {format(field.value.from, "PPP")} - {format(field.value.to, "PPP")}
                                                    </>
                                                ) : (
                                                    <span>Pick dates</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="range"
                                            selected={{
                                                from: field.value?.from,
                                                to: field.value?.to,
                                            }}
                                            onSelect={(range) => {
                                                field.onChange({
                                                    from: range?.from || new Date(),
                                                    to: range?.to || new Date(),
                                                });
                                            }}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Adults</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input type="number" min="1" max="12" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Children</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input type="number" min="0" max="12" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="rooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Rooms</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input type="number" min="1" max="12" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <Button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
                        Search
                    </Button>
                </div>
            </form>
        </Form>
    )
}


export default SearchForm