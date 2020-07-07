// Única responsabilidade: receber requisição e devolver resposta

import CreateAppointmentService from '../services/CreateAppointmentService';

import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

// Ponteiro de rotas
const appointmentRouter = Router();

// Objeto que manipula o repositório
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.post('/', async (request, response) => {
    try {
        const createAppointmentService = new CreateAppointmentService();

        const {provider_id, date} = request.body;
        const parsedDate = parseISO(date);

        const newAppointment = await createAppointmentService.execute({
            provider_id, date: parsedDate
        });

        return response.json({newAppointment});
    } catch(err) {
        return response.status(400).json({error: err.message});
    }
});

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

export default appointmentRouter;
