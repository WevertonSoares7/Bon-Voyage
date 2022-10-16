package br.com.crud.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import br.com.crud.factory.ConnectionFactory;
import br.com.crud.model.Veiculo;

public class VeiculoDAO {
	
public void save (Veiculo veiculo) {
	String sql = "INSERT INTO veiculo(marca,modelo,placa)" +
		"VALUES (?,?,?)";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, veiculo.getMarca());
		pstm.setString(2, veiculo.getModelo());
		pstm.setInt(3, veiculo.getPlaca());
		pstm.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
public void removeById(int id_veiculo) {
	String sql = "DELETE FROM veiculo WHERE id_veiculo = ?";
	
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setInt(1, id_veiculo);
		pstm.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
public void update (Veiculo veiculo) {
	String sql = "UPDATE veiculo SET marca = ?, modelo = ?, placa = ?"
			+ "WHERE id_veiculo = ?";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, veiculo.getMarca());
		pstm.setString(2, veiculo.getModelo());
		pstm.setInt(3, veiculo.getPlaca());
		pstm.setInt(4, veiculo.getId_veiculo());
		pstm.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
public List<Veiculo> getVeiculos(){
	String sql = "SELECT * FROM veiculo";
	
	List<Veiculo> veiculos = new ArrayList<Veiculo>();
	
	Connection conn = null;
	PreparedStatement pstm = null;
	ResultSet rset = null;
	
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		rset = pstm.executeQuery();
		
		while(rset.next()) {
			Veiculo veiculo = new Veiculo();
			veiculo.setId_veiculo(rset.getInt("id_veiculo"));
			veiculo.setMarca(rset.getString("marca"));
			veiculo.setModelo(rset.getString("modelo"));
			veiculo.setPlaca(rset.getInt("placa"));
			veiculos.add(veiculo);
		}
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(rset != null) {
				rset.close();
			}
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	return veiculos;
}
}