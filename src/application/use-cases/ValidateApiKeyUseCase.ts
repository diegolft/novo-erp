import { IApiKeyService } from '../../domain/services/IApiKeyService';

export class ValidateApiKeyUseCase {
  constructor(private apiKeyService: IApiKeyService) {}

  execute(apiKey: string): boolean {
    return this.apiKeyService.validateApiKey(apiKey);
  }
}
