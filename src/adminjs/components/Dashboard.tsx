import React, {useState, useEffect} from 'react';
import { ApiClient, useCurrentAdmin } from 'adminjs';
import { H1, H2, Table, TableHead, TableRow, TableCell, TableBody } from '@adminjs/design-system';

export default function Dashboard() {

  const [resources, setResources] = useState(null);
  const [currentAdmin] = useCurrentAdmin();
  const api = new ApiClient();

  useEffect(() => {
    getResources();
  }, [])

  async function getResources() {
    try {
      var result = await api.getDashboard();
      setResources(result.data);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section style={{ padding: '1.5rem' }}>
    <H1>Seja bem-vindo, {currentAdmin?.firstName}!</H1>

    <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
      <H2>Resumo</H2>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#FF0043' }}>
            <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
            <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            resources ?
              Object.entries(resources).map(([resource, count]) => (
                <TableRow key={resource}>
                  <TableCell>{resource}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))
              :
              <></>
          }
        </TableBody>
      </Table>
    </section>
  </section>
  );
}
