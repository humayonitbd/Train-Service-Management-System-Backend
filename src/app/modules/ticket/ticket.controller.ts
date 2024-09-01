import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { TicketService } from './ticket.service';

const purchaseTicket = catchAsync(async (req, res) => {
  const result = await TicketService.purchaseTicket(req.body);

  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found!',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Ticket Purchase successfully',
    data: result,
  });
});

const getAllTicket = catchAsync(async (req, res) => {
  const result = await TicketService.getAllTicket(req.query);

  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found!',
      data: '',
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Ticket All retrived successfully!',
    meta: result.meta,
    data: result.result,
  });
});

export const TicketControllers = {
  purchaseTicket,
  getAllTicket,
};
