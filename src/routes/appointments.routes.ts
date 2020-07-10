// Única responsabilidade: receber requisição e devolver resposta

import CreateAppointmentService from '../services/CreateAppointmentService';

import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Ponteiro de rotas
const appointmentRouter = Router();

// Aplica o middleware de autenticação de usuários a todas as rotas de appointments
appointmentRouter.use(ensureAuthenticated);

// Objeto que manipula o repositório
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.post('/', async (request, response) => {
    const createAppointmentService = new CreateAppointmentService();

    const {provider_id, date} = request.body;
    const parsedDate = parseISO(date);

    const newAppointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate
    });

    return response.json({newAppointment});
});

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

export default appointmentRouter;
