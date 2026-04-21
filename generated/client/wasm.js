
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.HostScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  phone: 'phone',
  plan: 'plan',
  subscriptionStatus: 'subscriptionStatus',
  subscriptionExpiresAt: 'subscriptionExpiresAt',
  walletBalance: 'walletBalance',
  setupFeePaid: 'setupFeePaid',
  gatewayVendorId: 'gatewayVendorId',
  cashfreeVendorId: 'cashfreeVendorId',
  razorpaySubscriptionId: 'razorpaySubscriptionId',
  lastLowBalanceAlert: 'lastLowBalanceAlert',
  apiKey: 'apiKey',
  legacyApiKey: 'legacyApiKey',
  legacyApiKeyExpires: 'legacyApiKeyExpires',
  settings: 'settings',
  webhooks: 'webhooks',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WalletTransactionScalarFieldEnum = {
  id: 'id',
  hostId: 'hostId',
  amount: 'amount',
  type: 'type',
  description: 'description',
  meta: 'meta',
  createdAt: 'createdAt'
};

exports.Prisma.AuthRecordScalarFieldEnum = {
  hostId: 'hostId',
  email: 'email',
  passwordHash: 'passwordHash',
  salt: 'salt',
  role: 'role',
  emailVerified: 'emailVerified',
  verifyToken: 'verifyToken',
  resetToken: 'resetToken',
  resetTokenExpires: 'resetTokenExpires'
};

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  hostId: 'hostId',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl',
  airbnbUrl: 'airbnbUrl',
  basePrice: 'basePrice',
  status: 'status',
  address: 'address',
  amenities: 'amenities',
  icalUrl: 'icalUrl',
  caretakerToken: 'caretakerToken',
  caretakerPhone: 'caretakerPhone',
  caretakerName: 'caretakerName',
  pricingSettings: 'pricingSettings',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  hostId: 'hostId',
  guestName: 'guestName',
  guestEmail: 'guestEmail',
  guestPhone: 'guestPhone',
  guestIdRef: 'guestIdRef',
  checkIn: 'checkIn',
  checkOut: 'checkOut',
  nights: 'nights',
  amount: 'amount',
  status: 'status',
  gatewayOrderId: 'gatewayOrderId',
  paymentSessionId: 'paymentSessionId',
  idVerified: 'idVerified',
  caretakerPhone: 'caretakerPhone',
  caretakerName: 'caretakerName',
  checkoutChecklist: 'checkoutChecklist',
  cleanProofUrl: 'cleanProofUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CalendarBlockScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  date: 'date',
  reason: 'reason',
  bookingId: 'bookingId'
};

exports.Prisma.LedgerEntryScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  hostId: 'hostId',
  propertyId: 'propertyId',
  gatewayOrderId: 'gatewayOrderId',
  grossAmount: 'grossAmount',
  hostAmount: 'hostAmount',
  istayAmount: 'istayAmount',
  status: 'status',
  settledAt: 'settledAt',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  hostId: 'hostId',
  type: 'type',
  title: 'title',
  message: 'message',
  propertyName: 'propertyName',
  meta: 'meta',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.GuestVerificationScalarFieldEnum = {
  bookingId: 'bookingId',
  guestName: 'guestName',
  idType: 'idType',
  idObjectKey: 'idObjectKey',
  status: 'status',
  extractedData: 'extractedData',
  matchScore: 'matchScore',
  flags: 'flags',
  createdAt: 'createdAt',
  verifiedAt: 'verifiedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  bookingId: 'bookingId',
  guestName: 'guestName',
  rating: 'rating',
  comment: 'comment',
  source: 'source',
  sourceLabel: 'sourceLabel',
  createdAt: 'createdAt'
};

exports.Prisma.GuestProfileScalarFieldEnum = {
  phone: 'phone',
  names: 'names',
  emails: 'emails',
  preferences: 'preferences',
  summary: 'summary',
  stayHistory: 'stayHistory',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HostKnowledgeScalarFieldEnum = {
  id: 'id',
  hostId: 'hostId',
  propertyId: 'propertyId',
  content: 'content',
  updatedAt: 'updatedAt'
};

exports.Prisma.WaitlistScalarFieldEnum = {
  id: 'id',
  email: 'email',
  phone: 'phone',
  interest: 'interest',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Host: 'Host',
  WalletTransaction: 'WalletTransaction',
  AuthRecord: 'AuthRecord',
  Property: 'Property',
  Booking: 'Booking',
  CalendarBlock: 'CalendarBlock',
  LedgerEntry: 'LedgerEntry',
  Notification: 'Notification',
  GuestVerification: 'GuestVerification',
  Review: 'Review',
  GuestProfile: 'GuestProfile',
  HostKnowledge: 'HostKnowledge',
  Waitlist: 'Waitlist'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\hudav\\Documents\\GitHub\\istay\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "deno",
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\hudav\\Documents\\GitHub\\istay\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.4.1",
  "engineVersion": "a9055b89e58b4b5bfb59600785423b1db3d0e75d",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\", \"deno\"]\n  output          = \"../generated/client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// ── CORE ENTITIES ─────────────────────────────────────────────\n\nmodel Host {\n  id                     String    @id @default(uuid())\n  email                  String    @unique\n  name                   String\n  phone                  String\n  plan                   String    @default(\"monthly\") // \"monthly\" or \"lifetime\"\n  subscriptionStatus     String    @default(\"expired\") // \"active\", \"expired\", \"trailing\"\n  subscriptionExpiresAt  DateTime?\n  walletBalance          Float     @default(0)\n  setupFeePaid           Boolean   @default(false)\n  gatewayVendorId        String?\n  cashfreeVendorId       String?\n  razorpaySubscriptionId String?\n  lastLowBalanceAlert    DateTime?\n  apiKey                 String?\n  legacyApiKey           String?\n  legacyApiKeyExpires    DateTime?\n  settings               Json? // logoUrl, gstin, businessName, etc.\n  webhooks               Json? // Array of WebhookConfig\n  createdAt              DateTime  @default(now())\n  updatedAt              DateTime  @updatedAt\n\n  // Relations\n  auth               AuthRecord?\n  properties         Property[]\n  bookings           Booking[]\n  ledgerEntries      LedgerEntry[]\n  notifications      Notification[]\n  knowledge          HostKnowledge[]\n  walletTransactions WalletTransaction[]\n}\n\nmodel WalletTransaction {\n  id          String   @id @default(uuid())\n  hostId      String\n  amount      Float // Positive for top-up, negative for usage\n  type        String // \"topup\", \"ai_usage\"\n  description String\n  meta        Json? // { tokens: { in, out }, model, etc. }\n  createdAt   DateTime @default(now())\n\n  host Host @relation(fields: [hostId], references: [id])\n}\n\nmodel AuthRecord {\n  hostId            String    @id\n  email             String    @unique\n  passwordHash      String\n  salt              String\n  role              String    @default(\"owner\")\n  emailVerified     Boolean   @default(false)\n  verifyToken       String?\n  resetToken        String?\n  resetTokenExpires DateTime?\n\n  host Host @relation(fields: [hostId], references: [id])\n}\n\nmodel Property {\n  id              String   @id @default(uuid())\n  hostId          String\n  name            String\n  description     String\n  imageUrl        String\n  airbnbUrl       String?\n  basePrice       Float\n  status          String   @default(\"pending\")\n  address         String?\n  amenities       String[]\n  icalUrl         String?\n  caretakerToken  String?  @unique\n  caretakerPhone  String?\n  caretakerName   String?\n  pricingSettings Json? // weekendSurcharge, seasonalAdjustments, etc.\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n\n  host      Host            @relation(fields: [hostId], references: [id])\n  bookings  Booking[]\n  blocks    CalendarBlock[]\n  reviews   Review[]\n  knowledge HostKnowledge[]\n}\n\nmodel Booking {\n  id                String   @id @default(uuid())\n  propertyId        String\n  hostId            String\n  guestName         String\n  guestEmail        String\n  guestPhone        String?\n  guestIdRef        String?\n  checkIn           DateTime\n  checkOut          DateTime\n  nights            Int\n  amount            Float\n  status            String   @default(\"pending\")\n  gatewayOrderId    String?\n  paymentSessionId  String?\n  idVerified        Boolean  @default(false)\n  caretakerPhone    String?\n  caretakerName     String?\n  checkoutChecklist Json?\n  cleanProofUrl     String?\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  property      Property           @relation(fields: [propertyId], references: [id])\n  host          Host               @relation(fields: [hostId], references: [id])\n  ledgerEntries LedgerEntry[]\n  verification  GuestVerification?\n}\n\nmodel CalendarBlock {\n  id         String   @id @default(uuid())\n  propertyId String\n  date       DateTime // Store specifically as date\n  reason     String // booked, manual_block, ical\n  bookingId  String?\n\n  property Property @relation(fields: [propertyId], references: [id])\n}\n\nmodel LedgerEntry {\n  id             String    @id @default(uuid())\n  bookingId      String\n  hostId         String\n  propertyId     String\n  gatewayOrderId String\n  grossAmount    Float\n  hostAmount     Float\n  istayAmount    Float\n  status         String    @default(\"pending\")\n  settledAt      DateTime?\n  createdAt      DateTime  @default(now())\n\n  booking Booking @relation(fields: [bookingId], references: [id])\n  host    Host    @relation(fields: [hostId], references: [id])\n}\n\nmodel Notification {\n  id           String   @id @default(uuid())\n  hostId       String\n  type         String\n  title        String\n  message      String\n  propertyName String\n  meta         Json?\n  read         Boolean  @default(false)\n  createdAt    DateTime @default(now())\n\n  host Host @relation(fields: [hostId], references: [id])\n}\n\nmodel GuestVerification {\n  bookingId     String    @id\n  guestName     String\n  idType        String\n  idObjectKey   String?\n  status        String    @default(\"pending\")\n  extractedData Json? // name, idLast4, dob, etc.\n  matchScore    Int?\n  flags         String[]\n  createdAt     DateTime  @default(now())\n  verifiedAt    DateTime?\n\n  booking Booking @relation(fields: [bookingId], references: [id])\n}\n\nmodel Review {\n  id          String   @id @default(uuid())\n  propertyId  String\n  bookingId   String?\n  guestName   String\n  rating      Int\n  comment     String\n  source      String   @default(\"direct\") // direct, imported\n  sourceLabel String\n  createdAt   DateTime @default(now())\n\n  property Property @relation(fields: [propertyId], references: [id])\n}\n\nmodel GuestProfile {\n  phone       String   @id\n  names       String[]\n  emails      String[]\n  preferences String[]\n  summary     String?\n  stayHistory Json? // Array of stay objects\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel HostKnowledge {\n  id         String   @id @default(uuid())\n  hostId     String\n  propertyId String\n  content    String\n  updatedAt  DateTime @updatedAt\n\n  host     Host     @relation(fields: [hostId], references: [id])\n  property Property @relation(fields: [propertyId], references: [id])\n}\n\nmodel Waitlist {\n  id        String   @id @default(uuid())\n  email     String\n  phone     String\n  interest  String?\n  createdAt DateTime @default(now())\n}\n",
  "inlineSchemaHash": "9af2c7d1109e8c0ca21bf70849cdc083a93648c0aac01764d7d109dddf91e9e4",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Host\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"plan\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subscriptionStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subscriptionExpiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"walletBalance\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"setupFeePaid\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"gatewayVendorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cashfreeVendorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"razorpaySubscriptionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastLowBalanceAlert\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"apiKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"legacyApiKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"legacyApiKeyExpires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"settings\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"webhooks\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"auth\",\"kind\":\"object\",\"type\":\"AuthRecord\",\"relationName\":\"AuthRecordToHost\"},{\"name\":\"properties\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"HostToProperty\"},{\"name\":\"bookings\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToHost\"},{\"name\":\"ledgerEntries\",\"kind\":\"object\",\"type\":\"LedgerEntry\",\"relationName\":\"HostToLedgerEntry\"},{\"name\":\"notifications\",\"kind\":\"object\",\"type\":\"Notification\",\"relationName\":\"HostToNotification\"},{\"name\":\"knowledge\",\"kind\":\"object\",\"type\":\"HostKnowledge\",\"relationName\":\"HostToHostKnowledge\"},{\"name\":\"walletTransactions\",\"kind\":\"object\",\"type\":\"WalletTransaction\",\"relationName\":\"HostToWalletTransaction\"}],\"dbName\":null},\"WalletTransaction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"meta\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"HostToWalletTransaction\"}],\"dbName\":null},\"AuthRecord\":{\"fields\":[{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"salt\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"verifyToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resetToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resetTokenExpires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"AuthRecordToHost\"}],\"dbName\":null},\"Property\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"airbnbUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"basePrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amenities\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icalUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"caretakerToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"caretakerPhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"caretakerName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pricingSettings\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"HostToProperty\"},{\"name\":\"bookings\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToProperty\"},{\"name\":\"blocks\",\"kind\":\"object\",\"type\":\"CalendarBlock\",\"relationName\":\"CalendarBlockToProperty\"},{\"name\":\"reviews\",\"kind\":\"object\",\"type\":\"Review\",\"relationName\":\"PropertyToReview\"},{\"name\":\"knowledge\",\"kind\":\"object\",\"type\":\"HostKnowledge\",\"relationName\":\"HostKnowledgeToProperty\"}],\"dbName\":null},\"Booking\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guestName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guestEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guestPhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guestIdRef\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"checkIn\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"checkOut\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"nights\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gatewayOrderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"paymentSessionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"idVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"caretakerPhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"caretakerName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"checkoutChecklist\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"cleanProofUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"BookingToProperty\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"BookingToHost\"},{\"name\":\"ledgerEntries\",\"kind\":\"object\",\"type\":\"LedgerEntry\",\"relationName\":\"BookingToLedgerEntry\"},{\"name\":\"verification\",\"kind\":\"object\",\"type\":\"GuestVerification\",\"relationName\":\"BookingToGuestVerification\"}],\"dbName\":null},\"CalendarBlock\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"CalendarBlockToProperty\"}],\"dbName\":null},\"LedgerEntry\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gatewayOrderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"grossAmount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"hostAmount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"istayAmount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"settledAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"booking\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToLedgerEntry\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"HostToLedgerEntry\"}],\"dbName\":null},\"Notification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"meta\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"read\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"HostToNotification\"}],\"dbName\":null},\"GuestVerification\":{\"fields\":[{\"name\":\"bookingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guestName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"idType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"idObjectKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"extractedData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"matchScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"flags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"verifiedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"booking\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToGuestVerification\"}],\"dbName\":null},\"Review\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guestName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"comment\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"source\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sourceLabel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"PropertyToReview\"}],\"dbName\":null},\"GuestProfile\":{\"fields\":[{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"names\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emails\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferences\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stayHistory\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"HostKnowledge\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hostId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"host\",\"kind\":\"object\",\"type\":\"Host\",\"relationName\":\"HostToHostKnowledge\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"HostKnowledgeToProperty\"}],\"dbName\":null},\"Waitlist\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"interest\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

