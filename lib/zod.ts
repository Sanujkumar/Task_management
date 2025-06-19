import {z} from "zod";

export const userSchema = z.object({
    email:      z.string().email("Invalid email format").max(50,"Max 50 characters"),
    password:   z.string().min(4, "Password must be at least 4 characters"),
    name:       z.string().max(30,"Max 30 characters").optional().nullable(),
    phone:      z.string().regex(/^\d{10}$/, "Phone must be 10 digits and must be number").optional().nullable(),
    image:      z.string().url("invalid image url").optional().nullable()
});   
       

export const taskSchema = z.object({
    title:          z.string().max(50,"Max 50 character"),
    description:    z.string().max(80,"Max 80 character"),
    date:           z.string().min(1, "Date is required").max(10,"wrong format"),
    priority:       z.string().optional().nullable(),
    inDetails:      z.string().min(60,"Min 60 characters").max(300,"Max 300 characters"),
    price:          z.coerce.number().int().min(1, "Price must be a positive number"),
    skills:         z.string().min(20,"min 20 characters").max(100,"Max 100 characters"),
    status:         z.boolean(),
    videoUrl:       z.string().url("invalid image url").optional().nullable(),
    pdfUrl:         z.string().url("Invalid PDF URL").optional().nullable(),  
});
  

export const notificationSchema = z.object({
    message:   z.string()
});

export const userDetailInfoSchema = z.object({
    skills:             z.string().max(200,"Max 200 characters").optional().nullable(),
    about:              z.string().max(200,"Max 200 characters").optional().nullable(),
    resume:             z.string().url().optional().nullable(),
    experience:         z.string().max(200,"Max 200 characters").optional().nullable(),
    linkdinUrl:         z.string().url().startsWith("https://www.linkedin.com/in/").optional().nullable(),
    githubUrl:          z.string().url().startsWith("https://github.com/").optional().nullable(),
    highestDegree:      z.string().optional().nullable()
});  


export const messageSchema = z.object({
    content:             z.string(),
    senderId:            z.number().int(),
    receiverId:          z.number().int(),
    roomId:              z.string()
});    
