declare module "s3-sync-client" {
  import EventEmitter from "events";
  import type { S3Client } from "@aws-sdk/client-s3";

  type OptionFilterInclude = {
    include: (key: string) => boolean;
  };
  type OptionFilterExclude = {
    exclude: (key: string) => boolean;
  };
  export type OptionFilter = OptionFilterInclude | OptionFilterExclude;

  export type S3SyncClientOptions = {
    commandInput?: object;
    del?: boolean;
    dryRun?: boolean;
    filters?: OptionFilter[];
    sizeOnly?: boolean;
    monitor?: TransferMonitor;
    maxConcurrentTransfers?: number;
    partSize?: number;
    relocations?: Array<[string, string]>; // [source, target]
  };

  export type TransferMonitorStatus = {
    size: {
      current: number;
      total: number;
    };
    count: {
      current: number;
      total: number;
    };
  };

  export class TransferMonitor extends EventEmitter {
    on: (
      event: "progress",
      callback: (progress: TransferMonitorStatus) => void
    ) => void;

    abort: () => void;
    setMetadata: (totalDataSize: number, totalObjectCount: number) => void;
    updateDataSize: (size: number) => void;
    updateObjectCount: (count: number) => void;

    getStatus: () => TransferMonitorStatus;
  }

  type localDir = string;
  type bucketUri = string;

  export default class S3SyncClient {
    constructor(options: { client: S3Client } | S3SyncClientOptions);
    client: S3Client;
    sync: (
      from: localDir | bucketUri,
      to: localDir | bucketUri,
      options: S3SyncClientOptions
    ) => Promise<object>;
  }
}
