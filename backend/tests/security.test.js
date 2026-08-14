import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

import { authTherapist, authPatient } from "../src/middleware/auth.middleware.js";
import rateLimit from "../src/middleware/rateLimit.middleware.js";
import generateQRToken from "../src/utils/generateQRToken.js";

test("authTherapist rejects patient tokens", () => {
  process.env.ACCESS_SECRET = "test-access-secret";

  const token = jwt.sign(
    { id: "patient-1", userType: "patient" },
    process.env.ACCESS_SECRET,
    { expiresIn: "1h" }
  );

  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = {};

  assert.throws(() => authTherapist(req, res, () => {}), /Acesso restrito a terapeutas/);
});

test("authPatient accepts patient tokens", () => {
  process.env.ACCESS_SECRET = "test-access-secret";

  const token = jwt.sign(
    { id: "patient-1", userType: "patient", therapistId: "therapist-1" },
    process.env.ACCESS_SECRET,
    { expiresIn: "1h" }
  );

  const req = { headers: { authorization: `Bearer ${token}` } };
  let nextCalled = false;

  authPatient(req, {}, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.userID, "patient-1");
  assert.equal(req.userType, "patient");
  assert.equal(req.therapistId, "therapist-1");
});

test("rateLimit blocks requests after the configured threshold", () => {
  const middleware = rateLimit({ windowMs: 60000, max: 2, message: "Muitas tentativas" });
  let nextCalls = 0;

  const req = { ip: "127.0.0.1" };
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  middleware(req, res, () => { nextCalls += 1; });
  middleware(req, res, () => { nextCalls += 1; });
  middleware(req, res, () => { nextCalls += 1; });

  assert.equal(nextCalls, 2);
  assert.equal(res.statusCode, 429);
  assert.equal(res.body.message, "Muitas tentativas");
});

test("generateQRToken creates a secure random token", () => {
  const token = generateQRToken();

  assert.match(token, /^[A-F0-9]{32}$/);
  assert.ok(token.length >= 32);
});
