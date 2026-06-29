import validationMiddleware from "../middleware/validationMiddleware";

describe("validationMiddleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        sourceIp: "192.168.1.1",
        packets: 100,
        bytes: 50000,
        synPacketsCount: 0
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  test("deve chiamare next se tutti i campi sono presenti", () => {
    validationMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test("deve restituire errore 400 se manca un campo", () => {
    delete req.body.bytes;

    validationMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Campi mancanti"
    });
    expect(next).not.toHaveBeenCalled();
  });
});