import React, { useState } from "react";

import Field from "./Field";

import MenuItem from "@material-ui/core/MenuItem";
import { Grid } from "@material-ui/core";
import { theme } from "../../../../Theme";

export default function Information(props: any) {
  const [touched, setTouched] = useState({});

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      style={{ marginBottom: theme.spacing(2) }}
    >
      <Grid item xs={12} lg={6}>
        <Field
          label="Nom"
          value={props.user?.lastName}
          isEditing={props.isEditing}
          error={props.errors?.lastName}
          touched={props.touched?.lastName}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { lastName: true }));
            props.onChange({ lastName: event.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Field
          label="Prénom"
          value={props.user?.firstName}
          isEditing={props.isEditing}
          error={props.errors?.firstName}
          touched={props.touched?.firstName}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { firstName: true }));
            props.onChange({ firstName: event.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Field
          label="Email"
          value={props.user?.email}
          isEditing={props.isEditing}
          error={props.errors?.email}
          touched={props.touched?.email}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { email: true }));
            props.onChange({ email: event.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Field
          label="Date de naîssance"
          value={props.user?.birthDate}
          formatter={(date: Date) => date.toLocaleDateString()}
          inputFormatter={(date: Date) =>
            `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
          }
          isEditing={props.isEditing}
          error={props.errors?.birthDate}
          touched={props.touched?.birthDate}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { birthDate: true }));
            props.onChange({ birthDate: event.target.value });
          }}
          inputProps={{
            type: "date",
          }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Field
          label="Poste"
          value={props.user?.jobTitle}
          isEditing={props.isEditing}
          error={props.errors?.jobTitle}
          touched={props.touched?.jobTitle}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { jobTitle: true }));
            props.onChange({ jobTitle: event.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Field
          label="Service"
          value={props.user?.departmentId}
          formatter={(val: any) => props.user?.departmentName}
          isEditing={props.isEditing}
          error={props.errors?.departmentName}
          touched={props.touched?.departmentName}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { departmentName: true }));
            props.onChange({ departmentId: event.target.value });
          }}
          inputProps={{
            select: true,
          }}
        >
          {[{ id: "", name: "" }, ...props.departments].map(
            (department, index) => {
              return (
                <MenuItem value={department.id} key={index}>
                  {department.name}
                </MenuItem>
              );
            }
          )}
        </Field>
      </Grid>

      <Grid item xs={12} lg={12}>
        <Field
          label="Biographie"
          value={props.user?.biography}
          isEditing={props.isEditing}
          error={props.errors?.biography}
          touched={props.touched?.biography}
          onChange={(event: any) => {
            setTouched(Object.assign(touched, { biography: true }));
            props.onChange({ biography: event.target.value });
          }}
          inputProps={{
            multiline: true,
            rows: 6,
            style: { width: "100%" },
            inputProps: {
              style: { width: "100%" },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
