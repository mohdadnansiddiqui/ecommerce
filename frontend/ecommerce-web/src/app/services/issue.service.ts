import { Injectable, signal } from '@angular/core';
import { Ticket } from '../models/app.models';

const STORAGE_KEY = 'ecommerce-admin-tickets';

@Injectable({ providedIn: 'root' })
export class IssueService {
  readonly tickets = signal<Ticket[]>(this.readTickets());

  create(ticket: Omit<Ticket, 'id' | 'createdDate'>) {
    const next: Ticket = {
      ...ticket,
      id: `TCK-${Date.now().toString().slice(-6)}`,
      createdDate: new Date().toISOString()
    };
    this.persist([next, ...this.tickets()]);
    return next;
  }

  update(id: string, patch: Partial<Ticket>) {
    const updated = this.tickets().map(ticket => (ticket.id === id ? { ...ticket, ...patch } : ticket));
    this.persist(updated);
  }

  getById(id: string): Ticket | undefined {
    return this.tickets().find(ticket => ticket.id === id);
  }

  private persist(tickets: Ticket[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    this.tickets.set(tickets);
  }

  private readTickets(): Ticket[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Ticket[];
    }

    return [
      {
        id: 'TCK-100241',
        title: 'Refund status unclear',
        description: 'Customer cannot see the latest refund state on the order detail page.',
        priority: 'High',
        status: 'OPEN',
        customer: 'Priya Sharma',
        createdDate: new Date().toISOString()
      },
      {
        id: 'TCK-100118',
        title: 'Delayed shipment notification',
        description: 'Shipment email was received but the portal timeline did not update.',
        priority: 'Medium',
        status: 'IN_PROGRESS',
        customer: 'Arjun Mehta',
        createdDate: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }
}
