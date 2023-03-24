import { users } from "@/fixtures/users";
import arrayChunk from "@/utils/array-chunk";
import { Box, Heading, MenuItem } from "@highoutput/hds";
import { Badge } from "@highoutput/hds-badge";
import { MenuDropdown } from "@highoutput/hds-dropdown";
import { Pagination } from "@highoutput/hds-pagination";
import { Table } from "@highoutput/hds-table";
import { useToast } from "@highoutput/hds-toast";
import * as React from "react";

export default function Index() {
  const [data, setData] = React.useState<typeof users>([]);
  const [loading, setLoading] = React.useState(true);

  const toast = useToast();

  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 10,
  });

  React.useEffect(() => {
    setData(users);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    return () => {
      setData(users);
      setLoading(true);
      setPagination({
        page: 1,
        pageSize: 10,
      });
    };
  }, []);

  const chunks = React.useMemo(
    () => arrayChunk(data, pagination.pageSize),
    [
      //
      data,
      pagination.pageSize,
    ],
  );

  const currentChunk = chunks.at(pagination.page - 1) ?? [];

  return (
    <Box padding={16}>
      <Table
        items={currentChunk}
        isLoading={loading}
        columns={[
          {
            label: "Name",
            renderRow({ name }) {
              return name;
            },
          },
          {
            label: "Username",
            renderRow({ username }) {
              return `@${username}`;
            },
          },
          {
            label: "Email",
            renderRow({ email }) {
              return email;
            },
          },
          {
            label: "Verified",
            renderRow({ isVerified }) {
              return (
                <Badge
                  label={isVerified ? "verified" : "not verified"}
                  accent={isVerified ? "success" : "error"}
                  hasIndicator
                />
              );
            },
          },
          {
            label: "Actions",
            renderRow() {
              return (
                <MenuDropdown
                  menuType="kebab"
                  menuItems={
                    <>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem
                        onClick={() => {
                          toast.success("Item successfuly deleted.");
                        }}
                      >
                        Delete
                      </MenuItem>
                    </>
                  }
                />
              );
            },
          },
        ]}
        renderHeader={
          <Box>
            <Heading>Dashboard</Heading>
          </Box>
        }
        renderFooter={
          <Pagination
            variant="relay"
            page={pagination.page}
            pageSize={pagination.pageSize}
            count={data.length}
            onChange={({ page, pageSize }) => {
              setPagination({
                page,
                pageSize,
              });
            }}
            sizes={[5, 10, 25, 50]}
          />
        }
      />
    </Box>
  );
}
