// Única responsabilidade: receber requisição e devolver resposta

import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// Ponteiro de rotas
const appointmentRouter = Router();

// Objeto que manipula o repositório
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.post('/', (request, response) => {
    try {
        const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

        const {provider, date} = request.body;
        const parsedDate = parseISO(date);

        const newAppointment = createAppointmentService.execute({provider, date: parsedDate});

        return response.json({newAppointment});
    } catch(err) {
        return response.status(400).json({error: err.message});
    }
});

appointmentRouter.get('/', (request, response) => {
    return response.json(appointmentsRepository.all());
});

export default appointmentRouter;
