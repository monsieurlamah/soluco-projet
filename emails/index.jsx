import { Button, Html } from "@react-email/components";
import Image from "next/image";
import * as React from "react";

export default function Email() {
  
    
    return (
        <Html>
           <table
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333' }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table cellSpacing="0" cellPadding="0" width="600" style={{ backgroundColor: '#ffffff' }}>
              <tbody>
                {/* Header */}
                <tr>
                  <td
                    align="center"
                    style={{
                      padding: '20px',
                      borderBottom: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <h1 style={{ margin: '0', color: '#ff5722' }}>Confirmation de commande chez soluco</h1>
                  </td>
                </tr>

                {/* Order Details */}
                <tr>
                  <td align="center" style={{ padding: '20px' }}>
                    <h2 style={{ margin: '0', fontSize: '24px', color: '#333' }}>Nous vous remercions de votre commande!</h2>
                    <p style={{ marginTop: '20px', fontSize: '16px' }}>
                    Votre commande a été confirmée et sera livrée sous peu.
                    </p>

                    {/* Order Summary */}
                    <table
                      cellSpacing="0"
                      cellPadding="10"
                      width="100%"
                      style={{ marginTop: '30px', border: '1px solid #e0e0e0', borderRadius: '5px' }}
                    >
                      <tbody>
                        <tr style={{ backgroundColor: '#f8f8f8' }}>
                          <th style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                          Article
                          </th>
                          <th style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                          Quantité
                          </th>
                          <th style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                          Prix
                          </th>
                        </tr>
                        {/* Sample Order Item with Image */}
                        <tr>
                          <td style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                            <img
                              src="https://via.placeholder.com/50x50"  // Replace with actual image URL
                              alt="Chicken Burger"
                              style={{ marginRight: '10px', verticalAlign: 'middle' }}
                            />
                            Chicken Burger
                          </td>
                          <td style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>2</td>
                          <td style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                            $10.00
                          </td>
                        </tr>
                        {/* Sample Order Item with Image */}
                        <tr>
                          <td style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                            <img
                              src="https://via.placeholder.com/50x50"  // Replace with actual image URL
                              alt="Pizza Margherita"
                              style={{ marginRight: '10px', verticalAlign: 'middle' }}
                            />
                            Pizza Margherita
                          </td>
                          <td style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>1</td>
                          <td style={{ textAlign: 'left', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
                            $12.00
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Total */}
                    <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                      Total: $22.00
                    </p>

                    {/* Delivery Information */}
                    <h3 style={{ margin: '20px 0 10px', fontSize: '20px', color: '#333' }}>Informations de livraison</h3>
                    <p style={{ fontSize: '16px' }}>
                      Address: 123 Main St, City, State, ZIP<br />
                      Contact: (123) 456-7890
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    align="center"
                    style={{
                      padding: '20px',
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <p style={{ margin: '0', fontSize: '14px' }}>
                    Merci d'avoir choisi notre service!<br />
                    Pour toute demande de renseignements, veuillez nous contacter à contact@soluco.com.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
        </Html>
    );
}