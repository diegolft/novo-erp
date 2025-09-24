import { IApiKeyService } from '../../domain/services/IApiKeyService';

export class ApiKeyService implements IApiKeyService {
  private readonly validApiKey: string;

  constructor() {
    this.validApiKey = process.env.API_KEY!;

    if (!this.validApiKey) {
      throw new Error('API_KEY environment variable is required');
    }
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.validApiKey;
  }
}
