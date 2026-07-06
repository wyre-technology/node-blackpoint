import { CompassOneConfig, validateConfig } from './config.js';
import { HttpClient } from './http.js';
import { AccountsResource } from './resources/accounts.js';
import { AssetsResource } from './resources/assets.js';
import { TenantsResource } from './resources/tenants.js';
import { DetectionsResource } from './resources/detections.js';
import { CloudMdrResource } from './resources/cloud-mdr.js';
import { ContactGroupsResource } from './resources/contact-groups.js';
import { NotificationsResource } from './resources/notifications.js';
import { UsersResource } from './resources/users.js';
import { CollectionsResource } from './resources/collections.js';
import { VulnerabilitiesResource } from './resources/vulnerabilities.js';

export class CompassOneClient {
  private readonly httpClient: HttpClient;

  // Resource instances
  public readonly accounts: AccountsResource;
  public readonly assets: AssetsResource;
  public readonly tenants: TenantsResource;
  public readonly detections: DetectionsResource;
  public readonly cloudMdr: CloudMdrResource;
  public readonly contactGroups: ContactGroupsResource;
  public readonly notifications: NotificationsResource;
  public readonly users: UsersResource;
  public readonly collections: CollectionsResource;
  public readonly vulnerabilities: VulnerabilitiesResource;

  constructor(config: CompassOneConfig) {
    validateConfig(config);
    this.httpClient = new HttpClient(config);

    // Initialize resources
    this.accounts = new AccountsResource(this.httpClient);
    this.assets = new AssetsResource(this.httpClient);
    this.tenants = new TenantsResource(this.httpClient);
    this.detections = new DetectionsResource(this.httpClient);
    this.cloudMdr = new CloudMdrResource(this.httpClient);
    this.contactGroups = new ContactGroupsResource(this.httpClient);
    this.notifications = new NotificationsResource(this.httpClient);
    this.users = new UsersResource(this.httpClient);
    this.collections = new CollectionsResource(this.httpClient);
    this.vulnerabilities = new VulnerabilitiesResource(this.httpClient);
  }
}