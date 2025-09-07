import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type OrgRaw = {
  id?: string;
  _id?: string;
  name?: string;
  organization_name?: string;
  title?: string;
};

export type Org = { id: string; name: string };

function normalizeOrg(raw: unknown): Org {
  const o = (raw || {}) as OrgRaw;
  const id = o.id || o._id || "";
  const name = o.name || o.organization_name || o.title || "Organization";
  return { id, name };
}

export const orgsApi = createApi({
  reducerPath: "orgsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getOrg: builder.query<Org, string>({
      query: (id) => `/orgs/${id}`,
      transformResponse: (raw: unknown): Org => {
        // support { data: {...} } or direct object
        const data = (raw as { data?: unknown })?.data ?? raw;
        return normalizeOrg(data);
      },
    }),
  }),
});

export const { useGetOrgQuery, useLazyGetOrgQuery } = orgsApi;
