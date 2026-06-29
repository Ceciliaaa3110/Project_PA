import roleMiddleware from "../middleware/roleMiddleware";

describe("roleMiddleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      user: {
        role: "admin"
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  test("deve chiamare next se il ruolo è corretto", () => {
    const middleware = roleMiddleware("admin");

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("deve restituire errore 403 se il ruolo non è corretto", () => {
    req.user.role = "user";

    const middleware = roleMiddleware("admin");

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Permessi insufficienti"
    });
    expect(next).not.toHaveBeenCalled();
  });
});