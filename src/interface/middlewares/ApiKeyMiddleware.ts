import { Request, Response, NextFunction } from 'express';
import { ValidateApiKeyUseCase } from '../../application/use-cases/ValidateApiKeyUseCase';
import { ApiKeyService } from '../../infrastructure/services/ApiKeyService';

export class ApiKeyMiddleware {
  private validateApiKeyUseCase: ValidateApiKeyUseCase;

  constructor() {
    const apiKeyService = new ApiKeyService();
    this.validateApiKeyUseCase = new ValidateApiKeyUseCase(apiKeyService);
  }

  validate = (req: Request, res: Response, next: NextFunction): void => {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      res.status(401).json({ error: 'API Key é obrigatória' });
      return;
    }

    const isValid = this.validateApiKeyUseCase.execute(apiKey);

    if (!isValid) {
      res.status(401).json({ error: 'API Key inválida' });
      return;
    }

    next();
  };
}
